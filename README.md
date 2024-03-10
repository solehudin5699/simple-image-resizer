### Simple image resizer

#### Run :

```bash
npm i
npm start
```

or from docker image [solehudin5699/img-resizer](https://hub.docker.com/r/solehudin5699/img-resizer)

```bash
docker run -it --name img-resizer -p 5000:5000 -d solehudin5699/img-resizer
```

#### Demo :

- Resize from uploaded image, visit :

  > Local --> http://localhost:5000/

  > My website: https://img-resizer.escloud.my.id/

- Resize from image url :

  > https://img-resizer.escloud.my.id/image/resize/{IMAGE-URL}{?|&}width={VALUE}&height={VALUE}&quality={VALUE}&format={VALUE}

- Notes:

  - IMAGE-URL: image url that will we resize/format
  - width: width that will we return (optional, max 5000)
  - height: height that will we return (optional, max 5000)
  - quality: quality image that will we return (optional, max 100)
  - format: format image (optional, use jpeg or jpg, png, or webp)
  - If IMAGE-URL have query, add "&" at the end IMAGE-URL, then followed query width, height, or other that you want.
    Example:

    IMAGE-URL=https://avatars.githubusercontent.com/u/65361695?v=4

    Use: https://img-resizer.escloud.my.id/image/resize/https://avatars.githubusercontent.com/u/65361695?v=4&width=100.

    If not, use "?" followed query you want, example

    IMAGE-URL=https://avatars.githubusercontent.com/u/65361695

    Use: https://img-resizer.escloud.my.id/image/resize/https://avatars.githubusercontent.com/u/65361695?width=100
