import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreas } from "../../area/store/areaThunk";
import { fetchRooms } from "../store/roomThunk";

function AreaTabList() {
    const dispatch = useDispatch();

    const {
        areas,
        loading,
        error,
    } = useSelector((state) => state.area);

    const user = useSelector(
        state => state.auth.user
    );

    // const isEmployee =
    //     user?.role === "EMPLOYEE";

    useEffect(() => {
                dispatch(fetchAreas(true));
    }, [dispatch, user]);

    useEffect(() => {
        if(areas.length > 0) {
            setSelectedAreaId(areas[0].id);
        } else {
            setSelectedAreaId(null);
        }
    }, [areas]);

    const [selectedAreaId, setSelectedAreaId] = useState(areas.length > 0 ? areas[0].id : null);

    useEffect(() => {
        if(!selectedAreaId) return;
            dispatch(fetchRooms({
                areaId: selectedAreaId,
                isActive: true,
                pageNumber: 0,
                pageSize: 6
            }));
    }, [selectedAreaId]);

    const handleTabChange = (event, newValue) => {
        setSelectedAreaId(newValue);
    }

    return ( 
        <Box>
            <Tabs value={selectedAreaId} onChange={handleTabChange}>
                {
                    areas.map((area, index) => (
                        <Tab key={index} label={area.areaName} value={area.id} />
                    ))
                }
            </Tabs>
        </Box>
     );
}

export default AreaTabList;