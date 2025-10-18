import { GET } from "@/app/api/blogs/route";
import BlogTable from "@/components/modules/Blogs/BlogTable";

const AllBlog = async () => {
    
    const allBlog = await GET()
    // console.log(allBlog, 'allblog')
    return (
        <div>
            all blogs
            <div className=" py-10 px-5">
            <BlogTable data={allBlog}/>
            </div>
        </div>
    );
}

export default AllBlog;