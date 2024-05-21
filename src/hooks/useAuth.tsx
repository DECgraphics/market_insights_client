import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../state/store"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { authorise } from "../state/auth/authSlice"

export function useAuth() {
    const authenticated = useSelector((state: RootState) => state.auth.authenticated)
    const dispatch = useDispatch<AppDispatch>()
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('user',user)
        if (user && !authenticated) {
          dispatch(authorise({uid: user.uid}))
        }
      })
      return unsubscribe
    }, [authenticated])
}