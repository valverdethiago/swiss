package br.com.vsconsulting.swiss.web.controllers;

import br.com.vsconsulting.swiss.model.entities.Project;
import br.com.vsconsulting.swiss.service.ProjectService;
import br.com.vsconsulting.swiss.to.ProjectSearchTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/rest/project")
public class ProjectController {

	@Autowired
	private ProjectService service;

	@RequestMapping(value = "/load/{id}", method = GET)
	public Project loadProject(@PathVariable("id") String id) {
		return service.load(id);
	}

	@RequestMapping(value = "/save", method = POST, consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
	public Project save(@RequestBody Project project) {
		return service.save(project);
	}

	@RequestMapping(value = "/archive", method = POST, consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
	public Project archive(@RequestBody Project project) {
		return service.archive(project);
	}

	@RequestMapping(value = "/activate", method = POST, consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
	public Project activate(@RequestBody Project project) {
		return service.activate(project);
	}

	@RequestMapping(value = "/find", method = POST, consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
	public Page<Project> find(@RequestBody ProjectSearchTo pageable) {
		return service.search(pageable);
	}

	@RequestMapping(value = "/list", method = GET)
	public Iterable<Project> list() {
		return service.listAll();
	}

}
