package br.com.igreja.Sys.desktop;

import br.com.igreja.Sys.SysApplication;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.concurrent.Worker;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressIndicator;
import javafx.geometry.Pos;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.concurrent.CompletableFuture;

public class SysDesktopApplication extends Application {

    private volatile ConfigurableApplicationContext springContext;
    private volatile boolean closing;
    private Stage stage;
    private Label statusLabel;

    @Override
    public void start(Stage stage) {
        this.stage = stage;
        stage.setTitle("IgrejaSys");
        stage.setMinWidth(900);
        stage.setMinHeight(600);
        stage.setScene(new Scene(criarTelaCarregamento(), 1280, 820));
        stage.setOnCloseRequest(event -> closing = true);
        stage.show();

        CompletableFuture.runAsync(() -> {
            ConfigurableApplicationContext context = null;

            try {
                context = new SpringApplicationBuilder(SysApplication.class)
                        .profiles("desktop")
                        .run();

                springContext = context;

                if (closing) {
                    context.close();
                    return;
                }

                Platform.runLater(() -> {
                    if (closing) return;
                    statusLabel.setText("Backend iniciado. Carregando o sistema...");
                    carregarInterface();
                });
            } catch (Exception erro) {
                if (context != null) {
                    context.close();
                }

                Platform.runLater(() -> {
                    if (!closing) {
                        mostrarErro("Não foi possível iniciar o Spring Boot.", erro);
                    }
                });
            }
        });
    }

    private VBox criarTelaCarregamento() {
        ProgressIndicator indicador = new ProgressIndicator();
        statusLabel = new Label("Iniciando o IgrejaSys e conectando ao banco...");

        VBox conteudo = new VBox(18, indicador, statusLabel);
        conteudo.setAlignment(Pos.CENTER);
        return conteudo;
    }

    private void carregarInterface() {
        WebView webView = new WebView();
        webView.getEngine().getLoadWorker().stateProperty().addListener(
                (observable, estadoAnterior, estadoAtual) -> {
                    if (closing) return;

                    if (estadoAtual == Worker.State.SUCCEEDED) {
                        stage.setScene(new Scene(webView, 1280, 820));
                    } else if (estadoAtual == Worker.State.FAILED) {
                        Throwable erro = webView.getEngine().getLoadWorker().getException();
                        mostrarErro("O backend iniciou, mas a página do sistema não carregou.",
                                erro != null ? erro : new IllegalStateException("Falha ao carregar festas.html."));
                    }
                });

        webView.getEngine().load("http://127.0.0.1:8080/festas.html");
    }

    private void mostrarErro(String mensagem, Throwable erro) {
        Alert alerta = new Alert(Alert.AlertType.ERROR);
        alerta.initOwner(stage);
        alerta.setTitle("IgrejaSys");
        alerta.setHeaderText(mensagem);
        Throwable causa = causaRaiz(erro);
        String detalhe = causa.getMessage();
        alerta.setContentText(detalhe == null || detalhe.isBlank()
                ? causa.getClass().getSimpleName()
                : detalhe);
        alerta.showAndWait();
        stage.close();
    }

    private static Throwable causaRaiz(Throwable erro) {
        Throwable atual = erro;
        while (atual.getCause() != null && atual.getCause() != atual) {
            atual = atual.getCause();
        }
        return atual;
    }

    @Override
    public void stop() {
        closing = true;

        ConfigurableApplicationContext context = springContext;
        if (context != null) {
            context.close();
        }
    }
}
