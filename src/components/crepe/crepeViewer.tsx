'use client'

import { Crepe } from '@milkdown/crepe'
import { MilkdownProvider, Milkdown, useEditor } from '@milkdown/react'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react'
import '@milkdown/crepe/theme/common/style.css'
import '@/styles/crepe-viewer.css'

interface CrepeViewerProps {
  readonly content: string
  readonly className?: string
}

function CrepeViewerInner({ content, className = '' }: CrepeViewerProps) {
  useEditor((root) => {
    return new Crepe({
      root,
      defaultValue: content,
      
      features: {
        [Crepe.Feature.CodeMirror]: true,
        [Crepe.Feature.Cursor]: false,
        [Crepe.Feature.Placeholder]: false,
        [Crepe.Feature.BlockEdit]: false,
        [Crepe.Feature.ListItem]: true,
        [Crepe.Feature.LinkTooltip]: false,
        [Crepe.Feature.ImageBlock]: true,
        [Crepe.Feature.Latex]: false,
      },
    }).setReadonly(true)
  }, [content])

  return (
    <div className={`crepe-viewer prose prose-slate max-w-none b ${className}`}>
      <Milkdown />
    </div>
  )
}

export function CrepeViewer({ content, className }: CrepeViewerProps) {
  return (
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <CrepeViewerInner content={content} className={className} />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  )
}