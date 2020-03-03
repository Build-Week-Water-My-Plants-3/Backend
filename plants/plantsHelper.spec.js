const db = require('../database/dbConfig.js');
const Plants = require('./plantsHelper.js');

// 
describe('plants helper', () => {
    beforeEach(async () => {
        await db('plants').truncate();
        })
    // √√ 
    describe('add(plant)', () => {
        it('should add 2 plants into the database', async () => {
            await Plants.add({
                species_name:"Rosa",
                nickname: "Baby Rose",
                h2o_amount: "1 cup every two weeks",
                user_id: 1,
            });
            await Plants.add({
                species_name: "Viola Tricolor",
                nickname:"Viola",
                h2o_amount: "1/2 cup every two weeks",
                user_id: 1,
            });

            const plants = await db('plants');
            expect(plants).toHaveLength(2); 
        })
    })

    //√√ 
    it('should return new plant', async () => {
        let plant = await Plants.add({
            species_name:"Fern",
            nickname: "Lady",
            h2o_amount: "1/4 cup a week",
            user_id: 2,
        });
        expect(plant.nickname).toBe('Lady');

        plant = await Plants.add({
            species_name:"Sageretia theezans",
            nickname: "Plum Bonsai",
            h2o_amount: "1 cup a month",
            user_id: 2,
        })
        expect(plant.nickname).toBe('Plum Bonsai');
    })
})