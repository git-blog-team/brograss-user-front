import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { RefObject } from 'react';
import { imageAPI } from '@/api/imageAPI';
import * as DOMPurify from 'dompurify';
export default function PostEditor({
    editorRef,
}: {
    editorRef: RefObject<Editor>;
}) {
    const customSanitizer = DOMPurify.sanitize;

    return (
        <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="800px"
            initialEditType="markdown"
            placeholder="Write Something"
            hideModeSwitch={true}
            language="ko-KR"
            hooks={{
                addImageBlobHook: imageAPI.postUploadImage,
            }}
            customHTMLSanitizer={customSanitizer}
        />
    );
}
