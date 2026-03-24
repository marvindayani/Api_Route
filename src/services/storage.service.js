const imagekit = require('@imagekit/nodejs');

const imagekitClient = new imagekit({
    privateKey: process.env.imagekit_private_key,
});

async function uploadFile(file) {

        const result = await imagekitClient.files.upload({
            file,
            fileName : "music_"+ Date.now(),
            folder:"yt-complete-backend/music"
        });
           return result;
}

module.exports = {
    uploadFile
};