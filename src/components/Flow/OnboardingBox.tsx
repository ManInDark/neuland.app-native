import React from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

const OnboardingBox = ({ title }: { title: string }): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create((theme) => ({
    container: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        maxWidth: 600,
        padding: theme.margins.card,
    },
    text: {
        color: theme.colors.text,
        fontSize: 16,
        textAlign: 'left',
    },
}))

export default OnboardingBox
