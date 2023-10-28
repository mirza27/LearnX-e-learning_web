-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Sep 2023 pada 05.30
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tes_learnx`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `chats`
--

CREATE TABLE `chats` (
  `chat_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `content` text,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `clases`
--

CREATE TABLE `clases` (
  `class_id` int(11) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `lecturer_id` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_category_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `event_categories`
--

CREATE TABLE `event_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `lecturers`
--

CREATE TABLE `lecturers` (
  `lecturer_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `materials`
--

CREATE TABLE `materials` (
  `material_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `material_name` varchar(255) NOT NULL,
  `file` blob,
  `link` varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `presences`
--

CREATE TABLE `presences` (
  `presence_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `is_closed` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `presence_claims`
--

CREATE TABLE `presence_claims` (
  `presence_claim_id` int(11) NOT NULL,
  `presence_id` int(11) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `students`
--

CREATE TABLE `students` (
  `student_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `student_clases`
--

CREATE TABLE `student_clases` (
  `student_class_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `student_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `task_desc` varchar(255) DEFAULT NULL,
  `file` blob,
  `link` varchar(255) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `task_upload`
--

CREATE TABLE `task_upload` (
  `task_upload_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `file` blob,
  `link` varchar(255) DEFAULT NULL,
  `coment` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indeks untuk tabel `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indeks untuk tabel `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `lecturer_id` (`lecturer_id`);

--
-- Indeks untuk tabel `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `event_category_id` (`event_category_id`);

--
-- Indeks untuk tabel `event_categories`
--
ALTER TABLE `event_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`lecturer_id`);

--
-- Indeks untuk tabel `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indeks untuk tabel `presences`
--
ALTER TABLE `presences`
  ADD PRIMARY KEY (`presence_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indeks untuk tabel `presence_claims`
--
ALTER TABLE `presence_claims`
  ADD PRIMARY KEY (`presence_claim_id`),
  ADD KEY `presence_id` (`presence_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indeks untuk tabel `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indeks untuk tabel `student_clases`
--
ALTER TABLE `student_clases`
  ADD PRIMARY KEY (`student_class_id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indeks untuk tabel `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indeks untuk tabel `task_upload`
--
ALTER TABLE `task_upload`
  ADD PRIMARY KEY (`task_upload_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `student_id` (`student_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `chats`
--
ALTER TABLE `chats`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `clases`
--
ALTER TABLE `clases`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `event_categories`
--
ALTER TABLE `event_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;


--
-- AUTO_INCREMENT untuk tabel `materials`
--
ALTER TABLE `materials`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `presences`
--
ALTER TABLE `presences`
  MODIFY `presence_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `presence_claims`
--
ALTER TABLE `presence_claims`
  MODIFY `presence_claim_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `student_clases`
--
ALTER TABLE `student_clases`
  MODIFY `student_class_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `task_upload`
--
ALTER TABLE `task_upload`
  MODIFY `task_upload_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `clases` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `clases` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`event_category_id`) REFERENCES `event_categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `presences`
--
ALTER TABLE `presences`
  ADD CONSTRAINT `presences_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `presence_claims`
--
ALTER TABLE `presence_claims`
  ADD CONSTRAINT `presence_claims_ibfk_1` FOREIGN KEY (`presence_id`) REFERENCES `presences` (`presence_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `presence_claims_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `student_clases`
--
ALTER TABLE `student_clases`
  ADD CONSTRAINT `student_clases_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `clases` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `student_clases_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `task_upload`
--
ALTER TABLE `task_upload`
  ADD CONSTRAINT `task_upload_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `task_upload_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- membuat trigger untuk generate student_id
DELIMITER //
CREATE TRIGGER generate_student_id
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
  DECLARE randomID VARCHAR(6);
  SET randomID = CONCAT('ST', LPAD(FLOOR(RAND() * 10000), 4, '0'));
  SET NEW.student_id = randomID;
END;
//
DELIMITER ;


-- membuat trigger untuk generate lecturer_id
DELIMITER //
CREATE TRIGGER generate_lecturer_id
BEFORE INSERT ON lecturers
FOR EACH ROW
BEGIN
  DECLARE randomID VARCHAR(6);
  SET randomID = CONCAT('LE', LPAD(FLOOR(RAND() * 10000), 4, '0'));
  SET NEW.lecturer_id = randomID;
END;
//
DELIMITER ;