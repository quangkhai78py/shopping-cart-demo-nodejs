exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('blog').del().then(function () {
        // Inserts seed entries
        return knex('blog').insert([
            {
                id: 1,
                category_id : 1,
                title: 'NGHỀ TELESALES – NHỮNG ĐIỀU CÓ THỂ BẠN CHƯA BIẾT',
                image: 'abc.jpg',
                content : 'Đây chính là lý do mà nhiều khách hàng từ chối bỏ thời ' +
                    'gian của họ để nghe điện thoại của bạn, dựa trên thời gian tiện lợi cho bạn, ' +
                    'nhằm mục đích kiếm lời của bạn'
            },
            {
                id: 2,
                category_id : 2,
                title: 'CẬP NHẬT CUỘC ĐỜI GIANG GẦN ĐÂY BẰNG 5 TẤM HÌNH',
                image: 'qwe.jpg',
                content : 'Tình hình cuộc đời Giang gần đây thế nào'
            },
            {
                id: 3,
                category_id : 3,
                title: 'BỘ ĐỒ CỦA BẠN GIÁ BAO NHIÊU?',
                image: 'asd.jpg',
                content : 'Đồ hiệu và chuyện đốt tiền có thể không như bạn nghĩ '
            }
        ]);
    });
};