import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import WebView from 'react-native-webview'
import sanitizeHtml from 'sanitize-html'

const PADDING = 4

export default function NotesDetails(): JSX.Element {
    const navigation = useNavigation()
    const { title, html } = useLocalSearchParams<{
        title: string
        html: string
    }>()
    const [loaded, setLoaded] = useState(false)

    const { t } = useTranslation('timetable')
    const sanitizedHtml = sanitizeHtml(html ?? '')
    const styledHtml = `
    <html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <style>
    body {
        padding: ${PADDING}px;
        color: ${styles.text.color};
        background-color: ${styles.background.backgroundColor};
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
    }
    </style>
    ${sanitizedHtml}`

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title ?? t('details.title'),
        })
    }, [navigation])

    return (
        <>
            <WebView
                source={{ html: styledHtml }}
                scalesPageToFit
                onLoadEnd={(e) => {
                    if (!loaded) {
                        setLoaded(true)
                    }
                }}
            />
            {!loaded && <View style={styles.container}></View>}
        </>
    )
}

const styles = StyleSheet.create((theme) => ({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
    },
    text: {
        color: theme.colors.text,
    },
    background: {
        backgroundColor: theme.colors.background,
    },
}))
