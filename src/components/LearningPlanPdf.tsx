import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { GenerateResultProps } from '@/app/(future)/generate-plans/components/generate-result';

const styles = StyleSheet.create({
    page: {
        padding: 24,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 16,
    },
    subsection: {
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        marginBottom: 4,
    },
    bullet: {
        marginLeft: 12,
        marginBottom: 2,
    },
    stepTitle: {
        fontWeight: 'bold',
        marginTop: 4,
        marginBottom: 2,
    },
    blockLabel: {
        marginTop: 8,
        marginBottom: 2,
        fontWeight: 'bold',
    },
});

export const LearningPlanPdf = ({
    learningPlan,
}: {
    learningPlan: GenerateResultProps['data']['learningPlan'];
}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Rencana Pembelajaran</Text>
                <Text style={styles.text}>Jumlah Hari: {learningPlan.numberOfDay}</Text>
                <Text style={styles.text}>Tujuan: {learningPlan.goal}</Text>
                <Text style={styles.text}>Ketertarikan: {learningPlan.interest}</Text>
            </View>

            {learningPlan.plan.days.map((day) => (
                <View key={day.dayNumber} style={styles.section}>
                    <Text style={styles.subtitle}>
                        Hari {day.dayNumber}: {day.theme}
                    </Text>
                    <View style={styles.subsection}>
                        <Text style={styles.blockLabel}>Judul Kegiatan:</Text>
                        <Text style={styles.text}>{day.activityTitle}</Text>
                    </View>

                    <View style={styles.subsection}>
                        <Text style={styles.blockLabel}>Bahan:</Text>
                        {day.materials.map((material, idx) => (
                            <Text key={idx} style={styles.bullet}>• {material}</Text>
                        ))}
                    </View>

                    <View style={styles.subsection}>
                        <Text style={styles.blockLabel}>Langkah Pembelajaran:</Text>
                        {Object.entries(day.steps).map(([stepName, stepList]) => (
                            <View key={stepName}>
                                <Text style={styles.stepTitle}>{stepName}</Text>
                                {stepList.map((step, idx) => (
                                    <Text key={idx} style={styles.bullet}>- {step}</Text>
                                ))}
                            </View>
                        ))}
                    </View>

                    <View style={styles.subsection}>
                        <Text style={styles.blockLabel}>Manfaat & Tujuan Pembelajaran:</Text>
                        <Text style={styles.bullet}>• Iman: {day.benefits.iman}</Text>
                        <Text style={styles.bullet}>• Kognitif: {day.benefits.cognitive}</Text>
                        <Text style={styles.bullet}>• Bahasa: {day.benefits.language}</Text>
                        <Text style={styles.bullet}>• Motorik: {day.benefits.motoric}</Text>
                        <Text style={styles.bullet}>• Akhlak: {day.benefits.akhlak}</Text>
                    </View>
                </View>
            ))}
        </Page>
    </Document>
);
