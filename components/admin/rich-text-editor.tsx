"use client"

import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback } from "react"
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Undo,
  Redo,
  Minus,
} from "lucide-react"
import { uploadFile } from "@/lib/upload-client"

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={`flex h-8 w-8 items-center justify-center rounded transition-colors disabled:opacity-40 ${
        active
          ? "bg-[var(--gold)] text-[var(--ink)]"
          : "text-[var(--cream)]/70 hover:bg-[var(--gold)]/20 hover:text-[var(--gold)]"
      }`}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const addImage = useCallback(async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        const url = await uploadFile(file)
        editor.chain().focus().setImage({ src: url }).run()
      } catch (err) {
        console.log("[v0] editor image upload error:", err)
        alert("Image upload failed. Please try again.")
      }
    }
    input.click()
  }, [editor])

  const setLink = useCallback(() => {
    const previous = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Enter the link URL", previous ?? "https://")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[var(--gold)]/20 bg-[var(--ink)]/40 p-2">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-[var(--gold)]/20" />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        title="Heading"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        title="Subheading"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-[var(--gold)]/20" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-[var(--gold)]/20" />
      <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Add link">
        <Link2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={addImage} title="Insert image">
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
        <Minus className="h-4 w-4" />
      </ToolbarButton>
      <div className="mx-1 h-5 w-px bg-[var(--gold)]/20" />
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  )
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the full content here…",
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html === "<p></p>" ? "" : html)
    },
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[280px] max-w-none px-4 py-3 text-[var(--cream)] focus:outline-none",
      },
    },
  })

  if (!editor) {
    return (
      <div className="rounded-lg border border-[var(--gold)]/20 bg-[var(--ink)]/20 p-4 text-sm text-[var(--cream)]/50">
        Loading editor…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--gold)]/20 bg-[var(--ink)]/20">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
