package com.noticias.service;

import static com.noticias.specs.NoticiaSpec.buscarPorConteudo;
import static com.noticias.specs.NoticiaSpec.buscarPorDataPublicacao;
import static com.noticias.specs.NoticiaSpec.buscarPorTitulo;
import static com.noticias.specs.NoticiaSpec.buscarNoticiasAtivas;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.noticias.model.Noticia;
import com.noticias.repository.NoticiaRepository;

@Service
public class NoticiaServiceImpl implements NoticiaService {

	@Autowired
	NoticiaRepository noticiaRepository;
	
	@Override
	public Noticia salvarNoticia(Noticia noticia) {
		
		noticia.setAtivo(true);
		Noticia noticiaSalva = noticiaRepository.save(noticia);
		
		return noticiaSalva;
	}

	@Override
	public List<Noticia> buscarNoticia(LocalDate dataPublicacao, String titulo, String conteudo) {
	
		Specification<Noticia> where = null;
		
		if(titulo != null)
		{
			where = addClausula(where, buscarPorTitulo(titulo));
		}
		
		if(dataPublicacao != null)
		{
			where = addClausula(where, buscarPorDataPublicacao(dataPublicacao));
		}
		
		if(conteudo != null)
		{
			where = addClausula(where, buscarPorConteudo(conteudo));
		}
		
		where = addClausula(where, buscarNoticiasAtivas());
		
		List<Noticia> listaNoticias = noticiaRepository.findAll(where);
		
		return listaNoticias;
	}

	@Override
	public Noticia alterarNoticia(Long idNoticia, Noticia noticiaAtualizada) {
		
		Noticia noticia = buscarNoticiaPorId(idNoticia);
		
		noticia.setTitulo(noticiaAtualizada.getTitulo());
		noticia.setConteudo(noticiaAtualizada.getConteudo());
		noticia.setDataPublicacao(noticiaAtualizada.getDataPublicacao());
		
		noticiaRepository.save(noticia);
		
		return noticia;
	}

	@Override
	public void removerNoticia(Long idNoticia) {
		
		Noticia noticia = buscarNoticiaPorId(idNoticia);
		noticia.setAtivo(false);
		noticiaRepository.save(noticia);
	}

	@Override
	public List<Noticia> buscarTodasNoticias() {
		List<Noticia> listaNoticias = noticiaRepository.findAll(buscarNoticiasAtivas());
		
		return listaNoticias;
	}

	@Override
	public Noticia buscarNoticiaPorId(Long idNoticia) {
		Noticia noticia = noticiaRepository.findById(idNoticia).get();
		
		return noticia;
	}
	
	private Specification<Noticia> addClausula(Specification<Noticia> where, Specification<Noticia> novaClausula)
	{
		if(where == null)
		{
			return Specification.where((novaClausula));
		}
		else
		{
			return Specification.where(where).and(novaClausula);
		}
	}

}
