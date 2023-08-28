import { FormEvent, RefObject } from 'react';
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { IPostDetailProps } from '@/types/postType';
import styled from '@emotion/styled';
import { RowSpaceBetweenCenter } from '@/styles/flexModules';
import Button from './Button';
const PostEditor = dynamic(() => import('@/components/newpost/PostEditor'), {
    ssr: false,
});

interface Props {
    onSubmit: (e: FormEvent) => void;
    setTitle: (title: string) => void;
    editorRef: RefObject<Editor>;
    data?: IPostDetailProps;
}

export default function EditorPage({
    onSubmit,
    setTitle,
    editorRef,
    data,
}: Props) {
    return (
        <WrapperEditor>
            <form onSubmit={onSubmit}>
                <WrapperEditorTitle>
                    <label htmlFor="title">
                        <StyledInput
                            type="text"
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            defaultValue={data?.title}
                            placeholder="제목"
                            required
                        />
                    </label>
                    <Button type="submit">등록</Button>
                </WrapperEditorTitle>
                <PostEditor
                    editorRef={editorRef}
                    initialValue={data?.content}
                />
            </form>
        </WrapperEditor>
    );
}

const WrapperEditor = styled.section`
    width: 100%;
    background-color: #fff;
`;

const WrapperEditorTitle = styled.div`
    ${RowSpaceBetweenCenter}
    width: 100%;
    padding: 20px;
`;

const StyledInput = styled.input`
    width: 100%;
    border: none;
    font-size: 2rem;
    font-weight: bold;
`;
