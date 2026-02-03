"use client"

import React, {useState} from "react";
import {Upload, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface ImageUploaderProps {
    readonly setSelectedImage: (file: File | null) => void;
    readonly selectedImage: File | null
}

const maxFileSize = 10 * 1024 * 1024;
const acceptedTypes = new Set([
    "image/png",
    "image/jpeg",
    "image/webp",
]);

export function ImageUploader({ setSelectedImage, selectedImage }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): string | null => {
        if(!acceptedTypes.has(file.type)) {
            return "Please upload a required format."
        }
        if (file.size > maxFileSize) {
            return "File size is too large."
        }
        return null;
    }

    const handleFile = (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSelectedImage(file);

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    }

    const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }

    const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }

    const handleRemove = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setSelectedImage(null);
        setError(null);
    }

    if(!selectedImage) {
        return (
            <div className="w-full">

                <button
                    type="button"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors w-full ${
                        isDragging
                            ? "border-blue-300 bg-blue-400"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                >
                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileInput}
                    />
                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                            Drop your image here, or{" "}
                            <span className="text-primary">browse</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            PNG, JPEG, or WebP (max 10MB)
                        </p>
                    </label>
                </button>
                {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                )}
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200">
                <Image
                    src={previewUrl || ""}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                />
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemove}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
            {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
            )}
        </div>
    )
}