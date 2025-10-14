import { getUserSession } from "@/app/helpers/getUserSession";

const DashboardHomePage = async () => {

  const session = await getUserSession()

  return (
     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome, {session?.user?.name} to my portfolio
      </h1>
      
      <p className="text-lg text-gray-600 italic text-center"></p>
    </div>
  );
};

export default DashboardHomePage;
