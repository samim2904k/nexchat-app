import { getAuthUser } from '../lib/api.js'
import { useQuery } from '@tanstack/react-query'

const useAuthUser = () => {
    const authUser= useQuery({
        queryKey: ["authUser"],
        queryFn: getAuthUser,
        retry: false, // single check to verify if user is authenticated or not 
    });

    return { isLoading : authUser.isLoading , authUser : authUser.data?.user } ;
}

export default useAuthUser