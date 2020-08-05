package com.noticias.specs;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.noticias.model.Noticia;
import com.noticias.model.Noticia_;


public class NoticiaSpec {
	
	public static Specification<Noticia> buscarPorTitulo(String titulo)
	{
		return (root, criteria, cb) -> cb.like(root.get(Noticia_.titulo),"%"+titulo+"%");
	}
	
	public static Specification<Noticia> buscarPorDataPublicacao(LocalDate dataPublicacao)
	{
		return (root, criteria, cb) -> cb.equal(root.get(Noticia_.dataPublicacao),dataPublicacao); 
	}
	
	public static Specification<Noticia> buscarPorConteudo(String conteudo)
	{
		return (root, criteria, cb) -> cb.like(root.get(Noticia_.conteudo),"%"+conteudo+"%");
	}
	
	public static Specification<Noticia> buscarNoticiasAtivas()
	{
		return (root, criteria, cb) -> cb.equal(root.get(Noticia_.ativo), true);
	}

}
