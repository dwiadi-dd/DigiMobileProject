import {create} from 'zustand';
import {ProfileRes} from '@utils/props';
import {ApiResponse} from '@services/httprequester';
import {fetchProfile} from '@services/investlyServices';
import crashlytics from '@react-native-firebase/crashlytics';
import storageServices from '@services/storageServices';
interface ProfileState {
  profileData: ProfileRes['data'] | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  setProfileData: (data: ProfileRes['data']) => void;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  profileData: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    set({loading: true, error: null});
    try {
      const res: ApiResponse<ProfileRes | undefined> = await fetchProfile(
        undefined,
      );
      if (res?.status === 200 && res.data) {
        get().setProfileData(res.data.data);
        crashlytics().setUserId(res.data.data.user_id);
        crashlytics().setAttributes({
          email: res.data.data.name,
          username: res.data.data.username,
        });
      } else if (res?.status === 401) {
        storageServices.clearLoginData();
        set({error: res?.data?.messages || 'session expired'});
      } else {
        set({error: res?.data?.messages || 'An error occurred'});
      }
    } catch (error) {
      set({error: 'An error occurred while fetching profile data'});
    } finally {
      set({loading: false});
    }
  },
  setProfileData: data => {
    set({profileData: data});
  },
}));
