"use client"

import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {createPost} from "@/app/Write/action";
import { toast } from "sonner"

export default function Write() {
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[username, setUsername] = useState("");
    const[isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const result = await createPost({
                title,
                content,
                username
            })

            if (!result.success) {
                setErrors(result.errors)
                return
            }

            setTitle("");
            setContent("");
            setUsername("");

            const showMessage = () => toast.success("Successfully created post!");
            showMessage();
        } catch(error) {
            setErrors({
                form: ["Failed to create Post"],
            })
            console.error(error)
        } finally {
            setIsSubmitting(false);
        }
    }

    const isFormValid = title.trim() && content.trim() && username.trim();

    return (
        <div className="flex-1 flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full max-w-2xl p-4 sm:p-6 lg:p-8 ">
                <form onSubmit={onSubmit}>
                    <FieldSet>
                        <span className="block text-3xl sm:text-4xl font-bold text-center mt-4">
                            Write Your Blog!
                        </span>

                        <FieldDescription className="text-center text-sm sm:text-base">
                            Everything you write will be anonymous
                        </FieldDescription>

                        <FieldGroup className="space-y-4 mt-6">
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea
                                    id="content"
                                    placeholder="Write your blog"
                                    rows={8}
                                    className="resize-y"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Publish as</FieldLabel>
                                <Input
                                    id="username"
                                    autoComplete="off"
                                    value={username}
                                    maxLength={153}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Field>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting || !isFormValid}
                            >
                                {isSubmitting ? "Posting..." : "Post"}
                            </Button>

                            {errors.form && (
                                <span className="text-red-500 text-sm text-center block">
                                    {errors.form[0]}
                                </span>
                            )}
                        </FieldGroup>
                    </FieldSet>
                </form>
            </div>
        </div>
    )
}
