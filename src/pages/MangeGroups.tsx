import EmptyGroupList from "../components/EmptyGroupList";

const groups = 0;
const ManageGroups = () => {
    if(groups == 0) {
        return <EmptyGroupList/>
    }
    return <div>Mange groups here</div>
}

export default ManageGroups;