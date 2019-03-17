export default {

    validate: obj => {
        const { title, videoUrl } = obj

        if (!title || title.length < 3) {
            return 'Title cannot be less than 3 symbols'
        }

        if (!videoUrl || !videoUrl.startsWith('http')) {
            return 'Video Url must be valid url !'
        }
    }
}