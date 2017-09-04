package br.com.vsconsulting.swiss.exception;

@SuppressWarnings("serial")
public class RuntimeBusinessException extends RuntimeException {

	public RuntimeBusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public RuntimeBusinessException(String message) {
		super(message);
	}
	
}
