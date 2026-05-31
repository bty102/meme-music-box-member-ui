import { Box } from "@mui/material";
import AreaTabList from "../components/AreaTabList";
import RoomList from "../components/RoomList";
import RoomFuncMenu from "../components/RoomFuncMenu";
import RoomPagination from "../components/RoomPagination";

function RoomListPage() {
    return ( 
        <Box>
            <AreaTabList />
            <RoomFuncMenu />
            <RoomList />
            <RoomPagination />
        </Box> 
    );
}

export default RoomListPage;