import { faker } from '@faker-js/faker';

export const attendess = Array.from({length: 228}).map(()=>{
    return {
        id: faker.number.int({min: 1000, max: 9999}),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        createdAt: faker.date.past(),
        checkedInAt: faker.date.recent({days: 14})
    }
})