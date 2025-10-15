

// export const generateStaticParams = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);
//   const {data: blogs} = await res.json();

import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { getBlogById } from "@/services/BlogServices";

//   return blogs.slice(0,5).map((blog: IBlog) =>  ({
//     blogId: String(blog.id)
//   }))
// }

// export const generateMetadata = async ({params}: {params: Promise<{blogId: string}>}) => {
//     const {blogId} = await params;

//     const blog = await getBlogById(blogId);

//     return{
//       title: blog?.title,
//       description: blog?.content
//     }
// }

const BlogsDetailsPage = async ({params}: {params: Promise<{blogId: string}>}) => {

    const {blogId} = await params;

    const blog = await getBlogById(blogId);
                                                                    // console.log(blogId,'blogId', blog)
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
     
      <BlogDetailsCard blog={blog}/>
    </div>
  );
};

export default BlogsDetailsPage;
