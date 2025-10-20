import BlogCard from "@/components/modules/Blogs/BlogsCard";
import { HeroBanner } from "@/components/modules/Home/HeroBanner";
import { ParallaxProject } from "@/components/modules/Home/ParallaxProject";
import { SkillsGalaxy } from "@/components/modules/Home/SkillsGalaxy";
import { IBlog } from "@/types";


export default async function HomePage() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`,{
    next: {
        tags:["BLOGS"]
    }
  });

  const {data: blogs} = await res.json();

  return (
    <div>
      <HeroBanner/>
      {/* <FeaturedBlogSection/>
      <HolographicBlogSection/>
      <MagneticBlog/> */}
      

      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="grid grid-cols-3 p-5 gap-4 max-w-6xl mx-auto">
        {
          blogs.slice(0,3).map((blog: IBlog) => <BlogCard key={blog.id} post={blog}/>)
        }
      </div>

      <SkillsGalaxy/>
      <ParallaxProject/>
      
    </div>
  );
}
