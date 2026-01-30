"use client"

import {Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {createPost} from "@/app/Write/action";

export default function Write() {
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[username, setUsername] = useState("");

    console.log(title)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createPost({
            title: title,
            content: content,
            username: username
        })
    }

    return (
        <div className="flex-1 flex justify-center bg-slate-100">
            <div className="bg-white w-140 p-2">
                <form onSubmit={onSubmit}>
                    <FieldSet>
                        <FieldLegend>Blog</FieldLegend>
                        <FieldDescription>Write your blog</FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Title:</FieldLabel>
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
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel>Publish as:</FieldLabel>
                                <Input
                                    id="username"
                                    autoComplete="off"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Field>

                            <Button type="submit">Post</Button>
                        </FieldGroup>
                    </FieldSet>
                </form>
            </div>
        </div>
    )
}