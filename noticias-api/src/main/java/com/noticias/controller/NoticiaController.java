package com.noticias.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noticias.model.Noticia;
import com.noticias.model.NoticiaBusca;
import com.noticias.service.NoticiaService;

@CrossOrigin
@RestController
@RequestMapping("/noticia")
public class NoticiaController 
{
	@Autowired
	NoticiaService noticiaService;
	
	@PostMapping
	public Noticia salvarNoticia(@RequestBody Noticia noticia)
	{
		Noticia noticiaSalva = noticiaService.salvarNoticia(noticia);
		
		return noticiaSalva;
	}
	
	@PutMapping(value = "/alterar/{idNoticia}")
	public Noticia alterarNoticia(@PathVariable Long idNoticia, @RequestBody Noticia noticiaAtualizada)
	{
		Noticia noticia = noticiaService.alterarNoticia(idNoticia, noticiaAtualizada);
		
		return noticia;
	}
	
	@GetMapping
	public List<Noticia> buscarTodasNoticias()
	{
		List<Noticia> listaTodasNoticias = noticiaService.buscarTodasNoticias();
		
		return listaTodasNoticias;
	}
	
	@PostMapping("/buscarNoticia")
	public List<Noticia> buscarNoticiaFiltrada(@RequestBody NoticiaBusca noticiaBusca)
	{
		List<Noticia> listaNoticiasFiltradas = noticiaService.buscarNoticia(noticiaBusca.getDataPublicacao(), noticiaBusca.getTitulo(), noticiaBusca.getConteudo());
		
		return listaNoticiasFiltradas;
	}
	
	@DeleteMapping(value = "/{idNoticia}")
	public void removerNoticia(@PathVariable Long idNoticia)
	{
		noticiaService.removerNoticia(idNoticia);
	}
	
	@GetMapping("/buscarNoticia/{idNoticia}")
	public Noticia buscarNoticiaPorId(@PathVariable Long idNoticia)
	{
		Noticia noticia = noticiaService.buscarNoticiaPorId(idNoticia);
		
		return noticia;
	}
}
