import { GET } from "@/app/api/project/route";
import ProjectTable from "@/components/modules/Project/ProjectTable";

const AllProject = async () => {
    
    const allProject = await GET()
    return (
        <div>
            
            <div className=" py-10 px-5">
                <ProjectTable data={allProject}/>
            </div>
        </div>
    );
}

export default AllProject;