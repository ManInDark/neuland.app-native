import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { FeedbackButton, StatusButton } from './ActionButtons'

export default function StatusBox({
    error,
    crash,
}: {
    error: Error
    crash: boolean
}): JSX.Element {
    const { t } = useTranslation('common')
    return (
        <View style={styles.boxContainer}>
            <Text style={styles.errorDetail}>{t('error.crash.steps')}</Text>
            <FeedbackButton error={error} crash={crash} />
            <StatusButton />
        </View>
    )
}

const styles = StyleSheet.create((theme) => ({
    boxContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        gap: 15,
        padding: 25,
    },
    errorDetail: {
        color: theme.colors.text,
        fontSize: 17,
        fontWeight: '500',
        paddingBottom: 30,
        textAlign: 'center',
    },
}))
