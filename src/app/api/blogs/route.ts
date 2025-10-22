import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`,{
            cache: "no-store"
        })

        const {data: blogs} = await res.json();
        return blogs;
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request){
    try {
        const formData = await request.formData();

    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if(!token){
        return NextResponse.json(
            { success: false, error: "Authentication required" },
            { status: 401 }
        );
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    });
    
    const data =  await response.json();

    if(response.ok){
        return NextResponse.json({
            success: true, 
            data: data.data,
            message: 'Blog created successfully'
        })
    } else {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to create blog' },
        { status: response.status }
      );
    }
    
   } catch (error: any) {
        console.error('Blog creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
    }

}
