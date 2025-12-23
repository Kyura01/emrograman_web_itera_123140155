# API Matakuliah - Pyramid Web Framework

**Nama:** Ahmad Ali Mukti  
**NIM:** 123140155

---

## Deskripsi

Aplikasi web API REST untuk mengelola data matakuliah menggunakan Pyramid Framework dan PostgreSQL. API ini menyediakan operasi CRUD (Create, Read, Update, Delete) lengkap untuk entitas matakuliah.

## Teknologi yang Digunakan

- **Framework:** Pyramid Web Framework
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Migration:** Alembic
- **Server:** Waitress

## Struktur Database

Tabel `matakuliah` memiliki struktur sebagai berikut:

| Field     | Type    | Description                    |
|-----------|---------|--------------------------------|
| id        | Integer | Primary key (auto-increment)   |
| kode_mk   | Text    | Kode mata kuliah (unique)      |
| nama_mk   | Text    | Nama mata kuliah               |
| sks       | Integer | Jumlah SKS                     |
| semester  | Integer | Semester                       |

## Instalasi dan Konfigurasi

### 1. Setup Environment

```bash
# Clone repository
cd pemweb_6

# Install dependencies
pip install -e .
```

### 2. Konfigurasi Database

Edit file `development.ini` dan sesuaikan connection string database:

```ini
sqlalchemy.url = postgresql://[USERNAME]:[PASSWORD]@localhost:5432/[DATABASE_NAME]
```

**Contoh:**
```ini
sqlalchemy.url = postgresql://postgres:your_password@localhost:5432/matakuliah_db
```

### 3. Jalankan Migration

```bash
# Upgrade database ke versi terbaru
alembic -c development.ini upgrade head
```

### 4. Inisialisasi Database

```bash
# Inisialisasi data awal (jika ada)
initialize_pemweb_6_db development.ini
```

### 5. Menjalankan Server

```bash
pserve development.ini
```

Server akan berjalan di `http://localhost:6543`

---

## API Endpoints

Base URL: `http://localhost:6543/api/matakuliah`

### 1. GET All Matakuliah
Mengambil semua data matakuliah.

**Endpoint:**
```
GET /api/matakuliah
```

**Request:**
```bash
curl -X GET http://localhost:6543/api/matakuliah
```

**Response Success (200 OK):**
```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Pemrograman Web",
      "sks": 3,
      "semester": 3
    },
    {
      "id": 2,
      "kode_mk": "IF102",
      "nama_mk": "Basis Data",
      "sks": 3,
      "semester": 3
    }
  ]
}
```

**Screenshot Postman:**
![GET All Matakuliah](screenshots/get_all.png)

---

### 2. GET Matakuliah by ID
Mengambil data matakuliah berdasarkan ID.

**Endpoint:**
```
GET /api/matakuliah/{id}
```

**Request:**
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

**Response Success (200 OK):**
```json
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Pemrograman Web",
  "sks": 3,
  "semester": 3
}
```

**Response Error (404 Not Found):**
```json
{
  "error": "Not Found"
}
```

**Screenshot Postman:**
![GET by ID](screenshots/get_by_id.png)

---

### 3. POST Create Matakuliah
Membuat data matakuliah baru.

**Endpoint:**
```
POST /api/matakuliah
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "kode_mk": "IF103",
  "nama_mk": "Struktur Data",
  "sks": 3,
  "semester": 2
}
```

**Request:**
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{
    "kode_mk": "IF103",
    "nama_mk": "Struktur Data",
    "sks": 3,
    "semester": 2
  }'
```

**Response Success (200 OK):**
```json
{
  "status": "success",
  "data": {
    "id": 3,
    "kode_mk": "IF103",
    "nama_mk": "Struktur Data",
    "sks": 3,
    "semester": 2
  }
}
```

**Screenshot Postman:**
![POST Create](/create.png)

---

### 4. PUT Update Matakuliah
Mengupdate data matakuliah berdasarkan ID.

**Endpoint:**
```
PUT /api/matakuliah/{id}
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "kode_mk": "IF103",
  "nama_mk": "Struktur Data Lanjut",
  "sks": 4,
  "semester": 4
}
```

**Request:**
```bash
curl -X PUT http://localhost:6543/api/matakuliah/3 \
  -H "Content-Type: application/json" \
  -d '{
    "kode_mk": "IF103",
    "nama_mk": "Struktur Data Lanjut",
    "sks": 4,
    "semester": 4
  }'
```

**Response Success (200 OK):**
```json
{
  "status": "updated",
  "data": {
    "id": 3,
    "kode_mk": "IF103",
    "nama_mk": "Struktur Data Lanjut",
    "sks": 4,
    "semester": 4
  }
}
```

**Response Error (404 Not Found):**
```json
{
  "error": "Not Found"
}
```

**Screenshot Postman:**
![PUT Update](screenshots/update.png)

---

### 5. DELETE Matakuliah
Menghapus data matakuliah berdasarkan ID.

**Endpoint:**
```
DELETE /api/matakuliah/{id}
```

**Request:**
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/3
```

**Response Success (200 OK):**
```json
{
  "status": "deleted"
}
```

**Response Error (404 Not Found):**
```json
{
  "error": "Not Found"
}
```

**Screenshot Postman:**
![DELETE](screenshots/delete.png)

---

## Testing dengan Postman

### Import Collection

1. Buka Postman
2. Import collection dari file `postman_collection.json` (jika tersedia)
3. Atau buat request manual sesuai dokumentasi di atas

### Contoh Testing Flow

1. **GET All** - Cek data awal
2. **POST** - Tambah matakuliah baru
3. **GET by ID** - Cek data yang baru dibuat
4. **PUT** - Update data matakuliah
5. **GET by ID** - Verifikasi update berhasil
6. **DELETE** - Hapus data
7. **GET All** - Verifikasi data sudah terhapus

---

## Error Handling

API ini menangani error dengan response code yang sesuai:

| Status Code | Description                           |
|-------------|---------------------------------------|
| 200         | Request berhasil                      |
| 404         | Data tidak ditemukan                  |
| 500         | Internal server error                 |

---

## Catatan Penting

1. Pastikan PostgreSQL sudah terinstall dan berjalan
2. Database `matakuliah_db` harus sudah dibuat
3. Jalankan migration sebelum menggunakan API
4. Kode matakuliah harus unique
5. Semua field wajib diisi saat create

---

## Screenshots

Untuk dokumentasi lengkap, simpan screenshot dari Postman di folder `screenshots/` dengan nama file:
- `get_all.png` - GET all matakuliah
- `get_by_id.png` - GET matakuliah by ID
- `create.png` - POST create matakuliah
- `update.png` - PUT update matakuliah
- `delete.png` - DELETE matakuliah

---

## Troubleshooting

### Database Connection Error
```
Error: could not connect to server
```
**Solusi:** Pastikan PostgreSQL berjalan dan kredensial di `development.ini` benar.

### Migration Error
```
Error: Target database is not up to date
```
**Solusi:** Jalankan `alembic -c development.ini upgrade head`

### Port Already in Use
```
Error: Address already in use
```
**Solusi:** Ganti port di `development.ini` atau stop proses yang menggunakan port 6543.

---

## Lisensi

Proyek ini dibuat untuk keperluan praktikum Pemrograman Web.

---

**Developed by Ahmad Ali Mukti (123140155)**
