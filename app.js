/**
 * note: fs-extra để xử lý vụ copy file
 */
const fs = require('fs-extra');

/**
 * note: path được sử dụng để thao tác với đường dẫn của các tập tin
 */
const path = require('path')

const { NotificationsUser } = require('./app/Helpers/Notifications');

let configDir = path.join(__dirname, 'config');
/**
 * note : Dùng fs.readdir để đọc các file trong folder chỉ định.
 * Chạy vòng lặp cho từng file, để xét điều
 */
(async () => {
    try {
        let allConfigFiles = await fs.readdir(configDir);
        for(let configFile of allConfigFiles) {
            if(configDir !== 'error.js') {
                require(path.join(configDir, configFile))
            }
        }
    } catch (e) {
        return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
    }
})();