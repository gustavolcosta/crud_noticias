package com.noticias.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.noticias.model.Noticia;

@Service
public interface NoticiaService 
{
	Noticia salvarNoticia(Noticia noticia);
	
	List<Noticia> buscarNoticia(LocalDate dataPublicacao, String titulo, String conteudo);
	
	Noticia buscarNoticiaPorId(Long idNoticia);
	
	Noticia alterarNoticia(Long idNoticia, Noticia noticiaAtualizada);
	
	void removerNoticia(Long idNoticia);
	
	List<Noticia> buscarTodasNoticias(); 
}
