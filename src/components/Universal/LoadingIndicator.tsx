import React from 'react'
import { ActivityIndicator, type ViewStyle } from 'react-native'
import { createUnistylesComponent } from 'react-native-unistyles'

interface LoadingIndicatorProps {
    color: string
    style?: ViewStyle
}

const CustomActivityIndicator = ({
    color,
    style,
}: LoadingIndicatorProps): JSX.Element => {
    return <ActivityIndicator size="small" color={color} style={style} />
}

const LoadingIndicator = createUnistylesComponent(
    CustomActivityIndicator,
    (theme) => ({
        color: theme.colors.primary,
    })
)

export default LoadingIndicator
