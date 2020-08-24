FROM node:12

RUN apt-get update \
    && apt-get -y install curl \
    postgresql-client-9.6

WORKDIR /app

ADD /wait /wait
RUN chmod +x /wait

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /app/services/backup.sh
RUN chmod 777 /app/services/db_backup_temp

EXPOSE 5001

CMD ["sh","-c","/wait && npm run dev"]
local               0be625cf7f92dcd1c998c93b384159bdd73d47da14019ad8b87a7ad8b088f9a2
local               1f7a2b7d9706d927f5610785553b9a4fe9c6c24a4b9d12a04d7bc04779df0752
local               2bb196589116ea047dcb0368651c77001d232bea054a1e4772cbec0ce34fc7d7
local               02e2805e4cb7120353a7074d45a78f7b6fefd12855dddbc65a238388190660ad
local               5c1e584a00d83339e31f3ef4dcdf99f82298b7532bf4f6968ac38ed27fb8c245
local               8f65ceb04bdf25b293513ff297d09ba70880c61ba38ee4016f0fdd10dbd0ccba
local               08ded474a142ca955effb4bd23b0be5bad00d0513f95bfaa168bc82821e42335
local               9e0879ec1663c79a6ced868491d0f456535393c88248ae3b956c737bd9b3af0a
local               12d9be98cc0dbab5768d25a376ac1173595e4aa9fe631ab93d3d1d17e03a3129
local               32cfae47fff9e969fd6315543c75580eadc00f2273d68284ba48f61e677d13e8
local               9149fc9ab3a27f44342a36efd4644e772b524e71cc62aeb2fed8af136530a5d7
local               60471a257a0d64a21fa3b2e25e314cb047c4c1813c8fd4cef3b43890f1879830
local               82520fbe76250b0927e7e89ca1961c1e0145083b827132144ba34120db8a17cd
local               379347f61559353b387882b2e4a8e38d18198c9831d2aded229383e8fc417944
local               b31c729029d0da8990c97acd69f7e3b8df4ea12902ce010a3f2670974e9f2b77
local               c4ea11c66ebc89d85f436be459f0bb1a2497f4d30b7026121958a901fdaa82aa
local               d7317702037d16eb58457c18a41aa6841e8214b38b4045bc97c0db8452edbed0
local               decode-online_decode_online_db
local               f2d86c2bd579f718539c529d170f7312c874aaab6ee5e1bd598aae7996a4e70c
local               f2f7f7ab45d7f6660dfa7d7f7067e5849030e57fb7dc3f70c0ae88b229cbee4d
local               f47f39c553656d09129126b27f9fb157770fa1cf61830d870eba85956f4ffd23
local               fe6e7a0adce5af0ae8501e2d2155cb5258a582db19475f2e504481e9c5732248


local               0be625cf7f92dcd1c998c93b384159bdd73d47da14019ad8b87a7ad8b088f9a2
local               1f7a2b7d9706d927f5610785553b9a4fe9c6c24a4b9d12a04d7bc04779df0752
local               2bb196589116ea047dcb0368651c77001d232bea054a1e4772cbec0ce34fc7d7
local               02e2805e4cb7120353a7074d45a78f7b6fefd12855dddbc65a238388190660ad
local               5c1e584a00d83339e31f3ef4dcdf99f82298b7532bf4f6968ac38ed27fb8c245
local               8f65ceb04bdf25b293513ff297d09ba70880c61ba38ee4016f0fdd10dbd0ccba
local               08ded474a142ca955effb4bd23b0be5bad00d0513f95bfaa168bc82821e42335
local               9e0879ec1663c79a6ced868491d0f456535393c88248ae3b956c737bd9b3af0a
local               12d9be98cc0dbab5768d25a376ac1173595e4aa9fe631ab93d3d1d17e03a3129
local               32cfae47fff9e969fd6315543c75580eadc00f2273d68284ba48f61e677d13e8
local               9149fc9ab3a27f44342a36efd4644e772b524e71cc62aeb2fed8af136530a5d7
local               60471a257a0d64a21fa3b2e25e314cb047c4c1813c8fd4cef3b43890f1879830
local               82520fbe76250b0927e7e89ca1961c1e0145083b827132144ba34120db8a17cd
local               379347f61559353b387882b2e4a8e38d18198c9831d2aded229383e8fc417944
local               b31c729029d0da8990c97acd69f7e3b8df4ea12902ce010a3f2670974e9f2b77
local               c4ea11c66ebc89d85f436be459f0bb1a2497f4d30b7026121958a901fdaa82aa
local               d7317702037d16eb58457c18a41aa6841e8214b38b4045bc97c0db8452edbed0
local               decode-online_decode_online_db
local               f2d86c2bd579f718539c529d170f7312c874aaab6ee5e1bd598aae7996a4e70c
local               f47f39c553656d09129126b27f9fb157770fa1cf61830d870eba85956f4ffd23
local               fe6e7a0adce5af0ae8501e2d2155cb5258a582db19475f2e504481e9c5732248


local               0be625cf7f92dcd1c998c93b384159bdd73d47da14019ad8b87a7ad8b088f9a2
local               1f7a2b7d9706d927f5610785553b9a4fe9c6c24a4b9d12a04d7bc04779df0752
local               2bb196589116ea047dcb0368651c77001d232bea054a1e4772cbec0ce34fc7d7
local               02e2805e4cb7120353a7074d45a78f7b6fefd12855dddbc65a238388190660ad
local               5c1e584a00d83339e31f3ef4dcdf99f82298b7532bf4f6968ac38ed27fb8c245
local               8f65ceb04bdf25b293513ff297d09ba70880c61ba38ee4016f0fdd10dbd0ccba
local               08ded474a142ca955effb4bd23b0be5bad00d0513f95bfaa168bc82821e42335
local               9e0879ec1663c79a6ced868491d0f456535393c88248ae3b956c737bd9b3af0a
local               12d9be98cc0dbab5768d25a376ac1173595e4aa9fe631ab93d3d1d17e03a3129
local               32cfae47fff9e969fd6315543c75580eadc00f2273d68284ba48f61e677d13e8
local               9149fc9ab3a27f44342a36efd4644e772b524e71cc62aeb2fed8af136530a5d7
local               60471a257a0d64a21fa3b2e25e314cb047c4c1813c8fd4cef3b43890f1879830
local               82520fbe76250b0927e7e89ca1961c1e0145083b827132144ba34120db8a17cd
local               379347f61559353b387882b2e4a8e38d18198c9831d2aded229383e8fc417944
local               b31c729029d0da8990c97acd69f7e3b8df4ea12902ce010a3f2670974e9f2b77
local               c4ea11c66ebc89d85f436be459f0bb1a2497f4d30b7026121958a901fdaa82aa
local               d7317702037d16eb58457c18a41aa6841e8214b38b4045bc97c0db8452edbed0
local               decode-online_decode_online_db
local               f2d86c2bd579f718539c529d170f7312c874aaab6ee5e1bd598aae7996a4e70c
local               f2f7f7ab45d7f6660dfa7d7f7067e5849030e57fb7dc3f70c0ae88b229cbee4d
local               f47f39c553656d09129126b27f9fb157770fa1cf61830d870eba85956f4ffd23
local               fe6e7a0adce5af0ae8501e2d2155cb5258a582db19475f2e504481e9c5732248
