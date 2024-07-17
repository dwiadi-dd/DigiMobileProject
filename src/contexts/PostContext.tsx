import {generateDummyPosts} from '@utils/helper';
import {PostItemProps} from '@utils/props';
import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  useEffect,
} from 'react';

interface PostsContextType {
  posts: PostItemProps[];
  addPost: (post: PostItemProps) => void;
  refreshPosts: () => void;
  loading: boolean;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  addPost: () => {},
  refreshPosts: () => {},
  loading: false,
});

export const usePosts = () => useContext(PostsContext);

export const PostsProvider: FunctionComponent<{children: React.ReactNode}> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setPosts(generateDummyPosts());
    setLoading(false);
  }, []);

  const addPost = (post: PostItemProps) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };
  const refreshPosts = () => {
    setLoading(true);
    setPosts(generateDummyPosts());
    setLoading(false);
  };

  return (
    <PostsContext.Provider value={{posts, addPost, refreshPosts, loading}}>
      {children}
    </PostsContext.Provider>
  );
};
