import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const imageData = await file.arrayBuffer();
        const base64Data = Buffer.from(imageData).toString("base64");
        const fileUri = `data:${file.type};base64,${base64Data}`;

        const uploadResponse = await cloudinary.uploader.upload(fileUri, {
            folder: "blog_posts",
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}