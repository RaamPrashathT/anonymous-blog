"use client";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, useEditor } from "@milkdown/react";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import "@milkdown/crepe/theme/common/style.css";
import "@/styles/crepe-custom.css";

interface CrepeEditorProps {
    readonly value?: string;
    readonly onChange?: (markdown: string) => void;
}

export function CrepeEditor({ value = "", onChange }: CrepeEditorProps) {
    useEditor(
        (root) => {
            const crepe = new Crepe({
                root,
                defaultValue: value,
                features: {
                    [Crepe.Feature.CodeMirror]: true,
                    [Crepe.Feature.BlockEdit]: true,
                    [Crepe.Feature.Placeholder]: true,
                    [Crepe.Feature.Cursor]: true,
                    [Crepe.Feature.ListItem]: true,
                    [Crepe.Feature.LinkTooltip]: true,
                    [Crepe.Feature.ImageBlock]: true,
                    [Crepe.Feature.Latex]: false,
                },
                featureConfigs: {
                    [Crepe.Feature.Placeholder]: {
                        text: "Write your blog here...",
                    },
                    [Crepe.Feature.LinkTooltip]: {
                        onCopyLink: () => {
                            console.log("Link copied!");
                        },
                    },
                    [Crepe.Feature.ImageBlock]: {
                        onUpload: async (file: File) => {
                            const formData = new FormData();
                            formData.append("file", file);

                            const response = await fetch("/api/upload", {
                                method: "POST",
                                body: formData,
                            });

                            const data = await response.json();
                            return data.url;
                        },
                    },
                    [Crepe.Feature.CodeMirror]: {
                        languages: [],
                    },
                },
            });

            crepe.editor.use(listener);
            crepe.editor.config((ctx) => {
                const listenerPlugin = ctx.get(listenerCtx);
                listenerPlugin.markdownUpdated((_, markdown) => {
                    if (onChange) onChange(markdown);
                });
            });

            return crepe;
        },
        [value],
    );

    return <Milkdown />;
}
