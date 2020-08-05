package com.noticias.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import com.noticias.model.Noticia;

public interface NoticiaRepository extends JpaSpecificationExecutor<Noticia>, JpaRepository<Noticia, Long> {

}
