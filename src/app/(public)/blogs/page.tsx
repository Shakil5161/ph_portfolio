import BlogCard from "@/components/modules/Blogs/BlogsCard";
import { IBlog } from "@/types";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "All Blogs"
}

const AllBlogsPage = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`,{
    cache: "no-store"
  })

  const {data: blogs} = await res.json()
  // console.log(blogs, 'blogs')
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className="grid grid-cols-3 p-5 gap-4 max-w-6xl mx-auto">
      {
        blogs?.map((blog: IBlog)=> <BlogCard key={blog.id} post={blog}/>)
      }
      </div>
    </div>
  );
};

export default AllBlogsPage;
