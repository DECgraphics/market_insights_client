import { PropsWithChildren, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

type ProtectedRouteProps = PropsWithChildren

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const authenticated = useSelector((state: RootState) => state.auth.authenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if(!authenticated) {
            navigate('/sign_in', {replace: true})
        }
    },[navigate, authenticated])

    return <>{authenticated ? children : null}</>
}


export function AuthRoute({ children }: ProtectedRouteProps) {
    const authenticated = useSelector((state: RootState) => state.auth.authenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if(authenticated) {
            navigate('/')
        }
    },[navigate, authenticated])

    return <>{!authenticated ? children : null}</>
}
