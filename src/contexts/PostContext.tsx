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
  refreshPosts: (post: PostItemProps) => void;
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
  const [loading, setLoading] = useState<boolean>(true); // Step 1: Add a loading state

  useEffect(() => {
    setLoading(true); // Start loading
    setTimeout(() => {
      const newPosts = generateDummyPosts();
      setPosts(newPosts);
      setLoading(false); // End loading
    }, 1000); // 4 seconds timeout
  }, []);

  const addPost = (post: PostItemProps) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };
  const refreshPosts = () => {
    setLoading(true); // Start loading
    setPosts(generateDummyPosts());
    setLoading(false); // End loading
  };

  return (
    <PostsContext.Provider value={{posts, addPost, refreshPosts, loading}}>
      {/* Step 3: Expose the loading state */}
      {children}
    </PostsContext.Provider>
  );
};
