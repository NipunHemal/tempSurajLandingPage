"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

interface EditorContextType {
    isEditable: boolean;
    pageData: Record<string, any>;
    hasChanges: boolean;
    setIsEditable: (value: boolean) => void;
    updatePageData: (key: string, value: any) => void;
    saveChanges: () => void;
    discardChanges: () => void;
    setOnSave: (cb: (data: any) => void) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isEditable, setIsEditable] = useState(true);
    const [pageData, setPageData] = useState<Record<string, any>>({});
    const [hasChanges, setHasChanges] = useState(false);
    const [onSaveCallback, setOnSaveCallback] = useState<((data: any) => void) | null>(null);

    const setOnSave = useCallback((cb: (data: any) => void) => {
        setOnSaveCallback(() => cb);
    }, []);

    // Ref to track the current image being edited
    const activeImageRef = useRef<HTMLImageElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updatePageData = useCallback((key: string, value: any) => {
        setPageData((prev) => ({ ...prev, [key]: value }));
        setHasChanges(true);
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && activeImageRef.current) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                const field = activeImageRef.current?.dataset.field;
                if (field) {
                    updatePageData(field, dataUrl);
                    if (activeImageRef.current) {
                        activeImageRef.current.src = dataUrl;
                    }
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset file input so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [updatePageData]);

    const saveChanges = useCallback(() => {
        if (onSaveCallback) {
            onSaveCallback(pageData);
        } else {
            console.log("💾 Final pageData JSON:", JSON.stringify(pageData, null, 2));
            alert("Check console for JSON export!");
        }
        setHasChanges(false);
    }, [pageData, onSaveCallback]);

    const discardChanges = useCallback(() => {
        setHasChanges(false);
        // In a real app, we might want to reload or revert DOM changes, 
        // but for this simple version, we'll just reset the state.
        window.location.reload();
    }, []);

    useEffect(() => {
        if (!isEditable) return;

        const handleBlur = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (target.dataset.editable === "true") {
                const field = target.dataset.field;
                if (field) {
                    updatePageData(field, target.innerText);
                }
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const editableEl = target.closest('[data-editable="true"]') as HTMLElement;

            if (editableEl && editableEl.dataset.type === "image") {
                e.preventDefault();
                activeImageRef.current = editableEl as HTMLImageElement;
                fileInputRef.current?.click();
            }
        };

        // Global style injection for editing indicators
        const styleId = "editor-global-styles";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = `
        [data-editable="true"] {
          position: relative;
          outline: none !important;
          transition: all 0.2s ease;
        }
        [data-editable="true"]:hover {
          outline: 2px dashed #ff0000 !important;
          outline-offset: 4px;
          cursor: text;
        }
        [data-editable="true"][data-type="image"]:hover {
          cursor: pointer;
        }
        [data-editable="true"]::after {
          content: 'Edit';
          position: absolute;
          top: -24px;
          right: 0;
          background: #ff0000;
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
          z-index: 50;
          text-transform: uppercase;
        }
        [data-editable="true"]:hover::after {
          opacity: 1;
        }
      `;
            document.head.appendChild(style);
        }

        // Inject contentEditable
        const observer = new MutationObserver(() => {
            document.querySelectorAll('[data-editable="true"]').forEach((el) => {
                const htmlEl = el as HTMLElement;
                if (htmlEl.dataset.type !== "image" && htmlEl.contentEditable !== "true") {
                    htmlEl.contentEditable = "true";
                    htmlEl.setAttribute("suppressContentEditableWarning", "true");
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Initial injection
        document.querySelectorAll('[data-editable="true"]').forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.dataset.type !== "image") {
                htmlEl.contentEditable = "true";
                htmlEl.setAttribute("suppressContentEditableWarning", "true");
            }
        });

        document.addEventListener("focusout", handleBlur);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("focusout", handleBlur);
            document.removeEventListener("click", handleClick);
            observer.disconnect();
            const style = document.getElementById(styleId);
            if (style) style.remove();
            document.querySelectorAll('[data-editable="true"]').forEach((el) => {
                (el as HTMLElement).contentEditable = "false";
            });
        };
    }, [isEditable, updatePageData]);

    return (
        <EditorContext.Provider value={{
            isEditable,
            pageData,
            hasChanges,
            setIsEditable,
            updatePageData,
            saveChanges,
            discardChanges,
            setOnSave
        }}>
            {children}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
            />
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error("useEditor must be used within an EditorProvider");
    }
    return context;
};
