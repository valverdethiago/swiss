package br.com.vsconsulting.swiss.to;

import br.com.vsconsulting.swiss.util.CustomPageRequest;

@SuppressWarnings("serial")
public class ClientSearchTo extends CustomPageRequest{

	private String searchTerm;

	public String getSearchTerm() {
		return searchTerm;
	}
	public void setSearchTerm(String searchTerm) {
		this.searchTerm = searchTerm;
	}

}
