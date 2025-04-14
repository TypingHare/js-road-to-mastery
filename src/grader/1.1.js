import { each, filter, findFirst, map } from '../answer/1.1.js'
import { expectEqual, expectSameList, grade } from './grader.js'

const sections = [
    { id: 'SEC201', professor: 'Wilkes', numStudents: 20 },
    { id: 'SEC202', professor: 'Adams', numStudents: 15 },
    { id: 'SEC203', professor: 'Lin', numStudents: 12 },
    { id: 'SEC204', professor: 'Wilkes', numStudents: 18 },
    { id: 'SEC205', professor: 'Hendrickson', numStudents: 26 },
]

const eachTestSuite = {
    name: '`each`',
    points: 5.0,
    cases: [
        expectEqual(() => {
            let totalStudents = 0
            each(function (section) {
                totalStudents += section.numStudents
            }, sections)
            return totalStudents
        }, 91),
        expectEqual(() => {
            let ids = []
            each((section) => ids.push(section.id), sections)
            return ids.join(',')
        }, 'SEC201,SEC202,SEC203,SEC204,SEC205'),
    ],
}

const findFirstTestSuite = {
    name: '`findFirst`',
    points: 5.0,
    cases: [
        expectEqual(
            () => findFirst((s) => s.professor === 'Wilkes', sections)?.id,
            'SEC201'
        ),

        expectEqual(
            () => findFirst((s) => s.numStudents > 25, sections)?.professor,
            'Hendrickson'
        ),

        expectEqual(
            () => findFirst((s) => s.professor === 'Unknown', sections),
            null
        ),
    ],
}

const filterTestSuite = {
    name: '`filter`',
    points: 5.0,
    cases: [
        expectSameList(() => {
            const filtered = filter((s) => s.professor === 'Wilkes', sections)
            return filtered.map((s) => s.id)
        }, ['SEC201', 'SEC204']),

        expectSameList(() => {
            const filtered = filter((s) => s.numStudents < 20, sections)
            return filtered.map((s) => s.id)
        }, ['SEC202', 'SEC203', 'SEC204']),

        expectSameList(
            () => filter((s) => s.professor === 'Nobody', sections),
            []
        ),
    ],
}

const mapTestSuite = {
    name: '`map`',
    points: 5.0,
    cases: [
        expectSameList(
            () => map((s) => s.id, sections),
            ['SEC201', 'SEC202', 'SEC203', 'SEC204', 'SEC205']
        ),

        expectSameList(
            () => map((s) => s.professor.toUpperCase(), sections),
            ['WILKES', 'ADAMS', 'LIN', 'WILKES', 'HENDRICKSON']
        ),

        expectSameList(
            () => map((s) => s.numStudents + 1, sections),
            [21, 16, 13, 19, 27]
        ),
    ],
}

grade(eachTestSuite, findFirstTestSuite, filterTestSuite, mapTestSuite)
