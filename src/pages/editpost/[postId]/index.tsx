import { postAPI } from '@/api/postAPI';
import EditorPage from '@/components/common/EditorPage';
import { IPostDetailProps } from '@/types/postType';
import { getContentFromRef } from '@/utils/getContentFromRef';
import { useMutation } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, RefObject, useRef, useState } from 'react';

export default function EditPost({ data }: { data: IPostDetailProps }) {
    const [title, setTitle] = useState(data.title);
    const { push } = useRouter();
    const editorRef: RefObject<Editor> = useRef(null);
    const { mutate } = useMutation(postAPI.putPostDetail, {
        onSuccess: ({ data: { result } }) => {
            push(`/post/${result}`);
        },
    });

    const onSubmitEditPost = (e: FormEvent) => {
        e.preventDefault();
        const { markDownContent, imgArray } = getContentFromRef(editorRef);
        if (markDownContent !== undefined)
            mutate({
                postId: data.postId,
                title,
                content: markDownContent,
                images: imgArray,
            });
    };
    return (
        <EditorPage
            onSubmit={onSubmitEditPost}
            setTitle={setTitle}
            editorRef={editorRef}
            data={data}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query: { postId },
}) => {
    const { data } = await postAPI.getPostDetailServer({ postId });

    return {
        props: {
            data: data.result[0],
        },
    };
};
