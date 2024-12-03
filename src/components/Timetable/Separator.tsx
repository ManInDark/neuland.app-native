import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export default function Separator(): JSX.Element {
    return <View style={styles.separator} />
}

const styles = StyleSheet.create((theme) => ({
    separator: {
        backgroundColor: theme.colors.border,
        height: 1,
        marginLeft: 50 + 12,
        marginVertical: 13,
    },
}))
